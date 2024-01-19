module.exports = {
  daemon: true,
  run: [{
    "method": "shell.run",
    "params": {
      "path": "app",
      "message": "python gradio_demo/app.py",
      "venv": "env",
      "on": [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
    }
  }, {
    "method": "local.set",
    "params": {
      "url": "{{input.event[0]}}"
    }
  }]
}
