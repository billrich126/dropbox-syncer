# bash script to install dev dependencies
#
# $ source install.sh

echo
echo ">>>>> [ install homebrew ]"
echo

if ! test $(which brew)
then
  if test "$(uname)" = "Darwin"
  then
      ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  elif test "$(expr substr $(uname -s) 1 5)" = "Linux"
  then
      ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
  fi
fi

echo ""
echo "[ ✔︎ ] Homebrew is installed!"

echo
echo ">>>>> [ install npm ]"
echo

if ! test $(which node)
then
    brew install node
fi

echo ""
echo "[ ✔︎ ] node and npm are installed!"

echo
echo ">>>>> [ install repository(source code) ]"
echo

if ! test -e -d ~/Desktop/dropbox-syncer
then
    if ! test $(which git)
    then
        brew install git
    fi

    git clone https://github.com/lxynox/dropbox-syncer.git ~/Desktop/dropbox-syncer
    cd ~/Desktop/dropbox-syncer
    npm i
fi

echo
echo "[ ✔︎ ] source code is installed on your Destkop!"
