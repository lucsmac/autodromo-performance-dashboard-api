# Usando a imagem oficial do Node.js
FROM node:lts

# Define o diretório de trabalho na imagem
WORKDIR /src

# Copia o arquivo package.json e package-lock.json (se existir) para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]
