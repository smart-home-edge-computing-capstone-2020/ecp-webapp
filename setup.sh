# Note: this script is intended for an Ubuntu vm.
# Version: Ubuntu Server 18.04 LTS (HVM), 
# AWS ami: ami-07ebfd5b3428b6f4d (64-bit x86) / ami-0400a1104d5b9caa1 (64-bit Arm)
# I recommend an aws t2.micro instance

# Set up top level modules
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python3-venv
sudo apt-get install python-pip

# Set up the frontend environment
sudo apt-get install npm
sudo npm install -g npm@latest
sudo npm install -g serve
cd ecp-frontend
sudo npm install
npm run build

# Set up the backend environment
sudo apt-get install python3-flask
cd ../flask-backend
python3 -m venv my_venv
source my_venv/bin/activate

# Install requirements
pip install --upgrade pip
pip install -r requirements.txt
