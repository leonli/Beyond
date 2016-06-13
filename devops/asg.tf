## Define the ELB security group first 
resource "aws_security_group" "beyond_elb_sg" {
  name        = "beyond_elb_sg"
  description = "The security gourp defined for ELB"
  vpc_id = "${aws_vpc.apps.id}"

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Define the beyond instance security group 
resource "aws_security_group" "beyond_instances_sg" {
  name        = "beyond_instances_sg"
  description = "The security gourp defined for the beyond running instances"
  vpc_id = "${aws_vpc.apps.id}"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access from ELB security group
  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = ["${aws_security_group.beyond_elb_sg.id}"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create ELB for the beyond app
resource "aws_elb" "beyond_elb" {
  name = "beyond-elb"

  # The same availability zone as our instances
  # availability_zones = ["${split(",", lookup(var.azs, var.region))}"]
  security_groups    = ["${aws_security_group.beyond_elb_sg.id}"]
  subnets = ["${aws_subnet.apps_public_subnet.*.id}"]
  cross_zone_load_balancing = true

  listener {
    instance_port     = 3000
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:3000/"
    interval            = 30
  }
}

resource "aws_iam_instance_profile" "codedeploy_profile" {
    name = "codedeploy_profile"
    roles = ["${aws_iam_role.beyond_deploy_role.name}"]
}

# Create the launch_configuration
resource "aws_launch_configuration" "beyond_lc" {
  name          = "beyond_lc"
  image_id      = "${lookup(var.amis, var.region)}"
  instance_type = "${var.instance_type}"
  iam_instance_profile = "${aws_iam_instance_profile.codedeploy_profile.id}"

  # block device
  root_block_device {
    volume_type = "io1"
    volume_size = "256"
    iops = "300"
  }

  # Security group
  security_groups = ["${aws_security_group.beyond_instances_sg.id}"]
  user_data       = "${file("userdata.sh")}"
  key_name        = "${var.key_name}"
}

# create the ASG 
resource "aws_autoscaling_group" "beyond_asg" {
  availability_zones   = ["${split(",", lookup(var.azs, var.region))}"]
  vpc_zone_identifier = ["${aws_subnet.apps_public_subnet.*.id}"]
  name                 = "beyond_asg"
  max_size             = "${var.asg_max}"
  min_size             = "${var.asg_min}"
  desired_capacity     = "${var.asg_desired}"
  force_delete         = true
  launch_configuration = "${aws_launch_configuration.beyond_lc.name}"
  load_balancers       = ["${aws_elb.beyond_elb.name}"]
}
