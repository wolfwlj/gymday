# Importing required module
import subprocess
import os
# Using system() method to
# execute shell commands

# this script does not work yet...
subprocess.call('npm run dev', shell=True, cwd='frontend/gymday')
subprocess.call('go run .', shell=True, cwd='backend/')
