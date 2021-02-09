pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }
    stages {
        stage ('Build') {
            steps {
                nodejs('node14') {
                    sh 'npm install'
                    sh 'npm publish'
               }
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}
