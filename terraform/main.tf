resource "cloudflare_d1_database" "app_db" {
  account_id = var.account_id
  name       = "${var.app_name}-db"
}

resource "cloudflare_r2_bucket" "app_bucket" {
  account_id    = var.account_id
  name          = "${var.app_name}-bucket"
  storage_class = "Standard"
}

resource "cloudflare_workers_script" "node_app" {
  script_name         = "${var.app_name}-workers"
  account_id          = var.account_id
  compatibility_date  = "2021-01-01"
  compatibility_flags = ["nodejs_compat"]
  content_file        = "../app/worker.js"
  content_sha256      = filesha256("../app/worker.js")
}

resource "cloudflare_workers_script_subdomain" "workers_dev" {
  account_id       = var.account_id
  script_name      = cloudflare_workers_script.node_app.script_name
  enabled          = true
  previews_enabled = false
}
