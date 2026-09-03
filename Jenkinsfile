pipeline {
    agent any

    environment {
        IMAGE = "praksahdocker/notes-app"        // ← your Docker Hub username
        DOCKER_CREDS = credentials('dockerhub')  // ← the credential you already stored
    }

    stages {
        stage('Build') {
            steps {
                // TODO: docker build with two tags ($BUILD_NUMBER and latest)
            }
        }

        stage('Test') {
            steps {
                // TODO: verify the image exists (docker image inspect)
            }
        }

        stage('Push') {
            when { branch 'main' }               // NEW: only on main
            steps {
                // TODO: docker login with --password-stdin, then push both tags
            }
        }
    }

    post {
        // NEW: success, failure, always blocks
    }
}
