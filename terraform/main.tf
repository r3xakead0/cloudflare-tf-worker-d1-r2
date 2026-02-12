resource "cloudflare_d1_database" "app_db" {
  account_id       = var.account_id
  name             = "${var.app_name}-db"

  read_replication = {
    mode = "disabled"
  }
}

resource "cloudflare_workers_script" "node_app" {
  script_name         = "${var.app_name}-workers"
  account_id          = var.account_id

  content_file        = "../app/worker.js"
  content_sha256      = filesha256("../app/worker.js")

  main_module         = "../app/worker.js"
}

resource "cloudflare_workers_script_subdomain" "workers_dev" {
  account_id       = var.account_id
  script_name      = cloudflare_workers_script.node_app.script_name
  enabled          = true
  previews_enabled = false
}
