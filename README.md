# mediapose_anglecalculator
for different 13 excercises calculating angles and sending servers for creating report
used opencv_js.wasm for calculating the direction of head. 

const image = cv.imread(canvasElement);
// const isMouthOpen = check_landmarks_open(landMarks, image);

const [pitch, yaw] = getFaceRotation(landMarks, image);
