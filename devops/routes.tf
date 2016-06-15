# The route53 records for the main domain
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

# The route53 records for the CDN domain
resource "aws_route53_record" "beyond_static" {
  zone_id = "${var.hosted_zone_id}"
  name = "${var.beyond_domain_cdn}"
  type = "A"

  alias {
    name = "${aws_cloudfront_distribution.beyond_cdn.domain_name}"
    zone_id = "Z2FDTNDATAQYW2"
    evaluate_target_health = true
  }
}
