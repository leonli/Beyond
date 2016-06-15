resource "template_file" "config_file" {
  template = "${file("config.tpl")}"
  vars {
    beyond_domain = "${var.beyond_domain}"
    rds_address = "${aws_db_instance.beyond_rds.address}"
    db_username = "${var.db_username}"
    db_password = "${var.db_password}"
    db_name = "${var.db_name}"
  }
  
  provisioner "local-exec" {
      command = "(cat <<EOF\n ${self.rendered} \nEOF\n) > ../config/config.js"
  }
}

resource "template_file" "config_file_static" {
  template = "${file("config_static.tpl")}"
  vars {
    static_domain = "${var.beyond_domain_cdn}"
    prefix = "${var.cdn_path}"
  }
  
  provisioner "local-exec" {
      command = "(cat <<EOF\n ${self.rendered} \nEOF\n) > ../config/lasso-config.json"
  }
}
