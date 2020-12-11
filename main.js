song = "";

right_wrist_x = 0;

left_wrist_x = 0;

right_wrist_y = 0;

left_wrist_y = 0;

score_right_wrist = 0;

score_left_wrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model Has been Loaded ✔");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_right_wrist = results[0].pose.keypoints[10].score;

        score_left_wrist = results[0].pose.keypoints[9].score;

        right_wrist_x = results[0].pose.rightWrist.x;
        left_wrist_x = results[0].pose.leftWrist.x;

        right_wrist_y = results[0].pose.rightWrist.y;
        left_wrist_y = results[0].pose.leftWrist.y;

        console.log("Score Right Wrist = " + score_right_wrist + "Score Left Wrist = " + score_left_wrist);

        console.log("Right Wrist X = " + right_wrist_x + "Right Wrist Y = " + right_wrist_y);

        console.log("Left Wrist X = " + left_wrist_x + "Left Wrist Y = " + left_wrist_y);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    stroke("#FF0000");
    fill("#FF0000");
    if (score_right_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 30);
        if (right_wrist_y > 0 && right_wrist_y <= 100) {
            document.getElementById("speed_display").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (right_wrist_y > 100 && right_wrist_y <= 200) {
            document.getElementById("speed_display").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (right_wrist_y > 200 && right_wrist_y <= 300) {
            document.getElementById("speed_display").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (right_wrist_y > 300 && right_wrist_y <= 400) {
            document.getElementById("speed_display").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (right_wrist_y > 400 && right_wrist_y <= 500) {
            document.getElementById("speed_display").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if (score_left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 30);
        convert_number = Number(left_wrist_y);
        remove_decimals = floor(convert_number);
        volume = remove_decimals / 500;
        document.getElementById("volume_display").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}