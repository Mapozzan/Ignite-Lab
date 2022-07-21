git# Ignite-Lab
Front End imersion with React JS


// Repositório criado no GitHub clonado para pasta local git usando comando git clone 'ssh link'

// Criação do projeto através do terminal Ubuntu
    - expo init -> seleciona Bare workflow

// Comando de instalçao para instalar todas as dependencias
    - npm install native-base                            = Instala a biblioteca native base, usamos para adiocionar components.
    - expo install react-native-svg                      = Dependencia para o native base usar svg
    - expo install react-native-safe-area-context  
    - expo install expo-font @expo-google-fonts/roboto   = instalar fonte utilizada no projeto
    - npm i react-native-svg-transformer --save-dev      = instalar para utilizar componentes svgs
    - npm install --save phosphor-react-native           = instalar biblioteca de incone
    - npm install @react-navigation/native               = instalar bibliteca para navegação entre telas
    -expo install react-native-screens                   = instalar dependecias para Expo
// Acessar App
    -expo start --tunnel

// Comandos Git
    git branch                                     = mostra todos branch locais
    git branch -r                                  = mostra todos branch locais e remotos
    git checkout "nome_branch"                     = migra de um branch para outro
    git status                                     = monitoramento dos arquivos
    git pull                                       = download dos arquivos do repositório remoto para pasta local
    git push                                       = ulpoad dos arquivos para o repositório remoto
    git add "nome_do_arquivo"                      = adiciona o arquivo do working directory para o stage index
    git commit -m "mesagem"                        = adiciona as modificações do arquivo para o repositório, registrando histórico de atualizações