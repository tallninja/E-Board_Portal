terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "af-south-1"
}

resource "aws_s3_bucket" "bg-s3" {
  bucket = "bg-blob-repository"
}

resource "aws_s3_bucket_ownership_controls" "bg-s3" {
  bucket = aws_s3_bucket.bg-s3.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "bg-s3" {
  bucket = aws_s3_bucket.bg-s3.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bg-s3" {
  depends_on = [
    aws_s3_bucket_ownership_controls.bg-s3,
    aws_s3_bucket_public_access_block.bg-s3,
  ]

  bucket = aws_s3_bucket.bg-s3.id
  acl    = "public-read"
}