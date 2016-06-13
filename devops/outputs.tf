output "beyond_elb_address" {
  value = "${aws_elb.beyond_elb.dns_name}"
}

output "db_instance_address" {
  value = "${aws_db_instance.beyond_rds.address}"
}

output "config_file" {
  value = "${template_file.config_file.rendered}"
}

