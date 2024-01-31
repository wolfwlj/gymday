# Importing required module
import subprocess
import os
# Using system() method to
# execute shell commands

subprocess.call('npm run dev', shell=True, cwd='frontend/gymday')
subprocess.call('go run .', shell=True, cwd='backend/')
