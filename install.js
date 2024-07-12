module.exports = {
  "cmds": {
    "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
    "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip install torch torchvision torchaudio"
  },
  "requires": [{
    "type": "conda",
    "name": ["ffmpeg", "llvm-openmp"],
    "args": "-c conda-forge"
  }],
  "run": [{
    "method": "shell.run",
    "params": {
      //"message": "git clone https://huggingface.co/spaces/TencentARC/PhotoMaker app"
      "message": "git clone https://github.com/peanutcocktail/PhotoMaker app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "path": "app",
      "venv": "env",
      "message": [
        "{{(gpu === 'nvidia' ? self.cmds.nvidia : ((platform === 'linux' && gpu === 'amd') ? self.cmds.amd : self.cmds.default))}}",
        "pip install -r ../requirements.txt",
        "pip install git+https://github.com/TencentARC/PhotoMaker.git",
        "pip install --upgrade huggingface-hub"
      ]
    }
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
