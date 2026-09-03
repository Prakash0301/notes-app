pipeline {
    agent any

    environment {
        IMAGE = "praksahdocker/notes-app"
        DOCKER_CREDS = credentials('dockerhub')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $IMAGE:$BUILD_NUMBER -t $IMAGE:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Verifying image was built...'
                sh 'docker image inspect $IMAGE:$BUILD_NUMBER'
            }
        }

        stage('Push') {
            steps {
                echo 'Pushing to Docker Hub...'
                sh 'echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin'
                sh 'docker push $IMAGE:$BUILD_NUMBER'
                sh 'docker push $IMAGE:latest'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded - image pushed!'
        }
        failure {
            echo 'Pipeline failed - check the logs.'
        }
        always {
            sh 'docker logout || true'
        }
    }
}
