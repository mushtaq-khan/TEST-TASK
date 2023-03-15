pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/mushtaq-khan/TEST-TASK.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
//         stage('Deploy') {
//             steps {
//                 sh 'npm run build'
//                 sh 'npm run deploy'
//             }
//         }
    }
}
