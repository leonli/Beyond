resource "aws_route53_record" "beyond" {
  zone_id = "${var.hosted_zone_id}"
  name = "${var.beyond_domain}"
  type = "A"

  alias {
    name = "${aws_elb.beyond_elb.dns_name}"
    zone_id = "${aws_elb.beyond_elb.zone_id}"
    evaluate_target_health = true
  }
}
