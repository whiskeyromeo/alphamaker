#!/bin/bash
yum update -y
# install nodejs
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
sudo yum install gcc-c++ make -y
# install python
yum install gcc -y
cd /usr/src
wget https://www.python.org/ftp/python/2.7.10/Python-2.7.10.tgz
tar xzf Python-2.7.10.tgz
cd Python-2.7.10
./configure
make altinstall
cd ~
# install git
yum install git -y
