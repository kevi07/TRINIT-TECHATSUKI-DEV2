let stream;
let recordedChunks = [];

async function startRecording() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById('video');
        videoElement.srcObject = stream;
        videoElement.play();

        const recordBtn = document.getElementById('recordBtn');
        const stopBtn = document.getElementById('stopBtn');
        const uploadBtn = document.getElementById('uploadBtn');

        recordBtn.disabled = true;
        stopBtn.disabled = false;
        uploadBtn.disabled = true;

        recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const recordedVideo = document.getElementById('recorded');
            recordedVideo.src = URL.createObjectURL(blob);
            recordedVideo.style.display = 'block';
            stream.getTracks().forEach(track => track.stop());

            recordBtn.disabled = false;
            stopBtn.disabled = true;
            uploadBtn.disabled = false;
        };

        mediaRecorder.start();
    } catch (error) {
        console.error('Error starting recording:', error);
    }
}

function stopRecording() {
    stream.getTracks().forEach(track => track.stop());
}

function selectFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function handleFile(files) {
    const file = files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const recordedVideo = document.getElementById('recorded');
            recordedVideo.src = reader.result;
            recordedVideo.style.display = 'block';
        };
    }
}


