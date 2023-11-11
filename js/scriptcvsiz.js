 
var socket = io("https://demo.ekullanici.com:3000" );
var uname=generateName(); 
var gresults=[];
var logresults=false;
var sonresultsr="";
socket.on('connect', function() {
  
socket.emit('iconnect', {
    uname: uname//user props here, user type , name , id 
});

});




socket.on('disconnected', function() {
    socket.emit('disconnected', "");
});

  
 

function dereceHesapla(nokta1,nokta2,nokta3){
    var a=[nokta1.x,nokta1.y];
    var b=[nokta2.x,nokta2.y];
    var c=[nokta3.x,nokta3.y];
    var radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0])
    var angle = parseInt(Math.abs(radians * 180.0 / Math.PI));
    if (angle > 180){
        angle = 360 - angle
    }
    return angle;
}

function dereceHesapla360(nokta1,nokta2,nokta3){
    var a=[nokta1.x,nokta1.y];
    var b=[nokta2.x,nokta2.y];
    var c=[nokta3.x,nokta3.y];
    var radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0])
    var angle = parseInt(Math.abs(radians * 180.0 / Math.PI));
 
    return angle;
}

 

 
function dereceHesapla2(results,hareket){
    var angles=[];

    if(results.poseLandmarks[27]){    
        if(hareket==1){
            var sanalnokta={
                x:results.poseLandmarks[27].x-( parseFloat(results.poseLandmarks[27].x) * parseFloat(5/100)),
                y:results.poseLandmarks[27].y,
            };
            var mesafe = (sanalnokta.y-results.poseLandmarks[25].y).toFixed(2);
            canvasText(mesafe,"red",canvasElement.width*0.39,canvasElement.height*0.60);
            angles.push(mesafe);
            var angle= dereceHesapla(results.poseLandmarks[25],results.poseLandmarks[27],sanalnokta);
            canvasDot(sanalnokta.x,sanalnokta.y,"blue");
            canvasText(angle,"red",canvasElement.width*0.39,canvasElement.height*0.70);
            angles.push(angle);

            var angle= dereceHesapla(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
            canvasText(angle,"yellow",canvasElement.width*0.52,canvasElement.height*0.70);
            angles.push(angle);
            var angle= dereceHesapla(results.poseLandmarks[11],results.poseLandmarks[27],sanalnokta);
            canvasText(angle,"blue",canvasElement.width*0.65,canvasElement.height*0.70);
            angles.push(angle);
            var angle= dereceHesapla(results.poseLandmarks[15],results.poseLandmarks[27],sanalnokta);
            canvasText(angle,"green",canvasElement.width*0.25,canvasElement.height*0.70);
            angles.push(angle);

            
        }
        else if(hareket=="2_l"){
            angles.push(results.poseLandmarks[26].y);
            var sanalnokta={
                x:results.poseLandmarks[12].x,
                y:Math.abs(results.poseLandmarks[12].y*1.25),
            };
            var angle=  dereceHesapla(sanalnokta,results.poseLandmarks[24],results.poseLandmarks[12]);
            canvasDot(sanalnokta.x,sanalnokta.y,"blue");
            canvasText(angle,"red",canvasElement.width*0.25,canvasElement.height*0.70);
            angles.push(angle);
            
            var sanalnokta={
                x:results.poseLandmarks[23].x,
                y:Math.abs(results.poseLandmarks[23].y*1.25),
            };
            var angle=  90- dereceHesapla(sanalnokta,results.poseLandmarks[23],results.poseLandmarks[25]);
            canvasDot(sanalnokta.x,sanalnokta.y,"yellow");
            canvasText(angle,"yellow",canvasElement.width*0.40,canvasElement.height*0.70);
            angles.push(angle);
        }
        else if(hareket=="2_r"){
            angles.push(results.poseLandmarks[25].y);
            var sanalnokta={
                x:results.poseLandmarks[11].x,
                y:Math.abs(results.poseLandmarks[11].y*1.25),
            };
            var angle=  dereceHesapla(sanalnokta,results.poseLandmarks[23],results.poseLandmarks[11]);
            canvasDot(sanalnokta.x,sanalnokta.y,"blue");
            canvasText(angle,"red",canvasElement.width*0.25,canvasElement.height*0.70);
            angles.push(angle);
            
            var sanalnokta={
                x:results.poseLandmarks[24].x,
                y:Math.abs(results.poseLandmarks[24].y*1.25),
            };
            var angle=  90- dereceHesapla(sanalnokta,results.poseLandmarks[24],results.poseLandmarks[26]);
            canvasDot(sanalnokta.x,sanalnokta.y,"yellow");
            canvasText(angle,"yellow",canvasElement.width*0.40,canvasElement.height*0.70);
            angles.push(angle);
        } 
        else if(hareket==4){
                if(typeof(results.poseLandmarks[23])!="undefined"){
                    var sanalnokta={
                        x:results.poseLandmarks[23].x,
                        y:(results.poseLandmarks[11].y),
                    };
                    var sanalnoktakafa={
                        x:results.poseLandmarks[11].x,
                        y:(results.poseLandmarks[3].y),
                    };
                    var angle=  dereceHesapla360(results.poseLandmarks[23],sanalnokta,results.poseLandmarks[15]);
                    var angle2=  dereceHesapla360(results.poseLandmarks[15],sanalnokta,results.poseLandmarks[23]);


                    var angle3=  90-dereceHesapla360(sanalnoktakafa,results.poseLandmarks[12],results.poseLandmarks[16]);
                    var angle4=  90-dereceHesapla360(sanalnoktakafa,results.poseLandmarks[11],results.poseLandmarks[15]);

                   //sanalnokta 12 16
                   //sanalnokta 11 15
                    if(angle>180){
                        canvasText("deger:"+angle3,"yellow",canvasElement.width*0.39,canvasElement.height*0.70);//derece ekranda gösterme
                        canvasText("deger:"+angle4,"black",canvasElement.width*0.59,canvasElement.height*0.70);//derece ekranda gösterme
                    }else{
                        canvasText(Math.abs(180-angle),"blue",canvasElement.width*0.39,canvasElement.height*0.70);//derece ekranda gösterme
                        canvasText(Math.abs(180-angle2),"red",canvasElement.width*0.59,canvasElement.height*0.70);//derece ekranda gösterme
                    }
                 
                    
                    angles.push(angle);
                    angles.push(angle2);
                    angles.push(angle3);
                    angles.push(angle4);
                
                }
 
   
                
        } 
        /*else if(hareket=="5"){
           

    
            if (typeof(results.faceLandmarks)!="undefined") {
                    landMarks = [];
                    results.faceLandmarks.forEach((landmarks) => {
                        const { x, y, z } = landmarks;
                        landMarks.push([x, y, z]);
                    });                  
            }
            
        
        
            canvasCtx.restore();
        
            const image = cv.imread(canvasElement);
            // const isMouthOpen = check_landmarks_open(landMarks, image);
          
            const [pitch, yaw] = getFaceRotation(landMarks, image);
            const pitch_result = pitch < -10 ? 'down' : pitch > 30 ? 'up' : 'forward';
            const yaw_result = yaw < -30 ? 'right' : yaw > 30 ? 'left' : 'forward';
          
            if(yaw_result=="left"){
                var angle=  dereceHesapla(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
                angles.push("left");
                angles.push(angle);
                canvasText(angle,"yellow",canvasElement.width*0.45,canvasElement.height*0.70);
            }else if(yaw_result=="right"){
                var angle=  dereceHesapla(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
                angles.push("right");
                angles.push(angle);
                canvasText(angle,"red",canvasElement.width*0.60,canvasElement.height*0.70);
            }            
        }*/
        else if(hareket==6){
            var _angle =  Object();
            _angle.fps=totalFps;
            var sanalnokta={
                x:results.poseLandmarks[24].x,
                y:Math.abs(results.poseLandmarks[24].y*1.25),
            };
            var angle=  dereceHesapla(sanalnokta,results.poseLandmarks[24],results.poseLandmarks[12]);
            angle = Math.abs(180-angle);  
            var a =  (results.poseWorldLandmarks[16].x - results.poseWorldLandmarks[12].x);
            var b =  (results.poseWorldLandmarks[16].y - results.poseWorldLandmarks[12].y);
            var c = Math.sqrt( (a*a) + (b*b) )*100;
            _angle.mesafe=c;
            _angle.derece=angle;
             angles.push(_angle);
            canvasDot(sanalnokta.x,sanalnokta.y,"blue");//sanal nokta ekranda gösterme
            canvasText(angle,"blue",canvasElement.width*0.39,canvasElement.height*0.70);//derece ekranda gösterme
            canvasText("Dist:" + c ,"yellow",canvasElement.width*0.59,canvasElement.height*0.70);//derece ekranda gösterme
            canvasLine(results.poseWorldLandmarks[16],results.poseWorldLandmarks[12]);

        }
        //matris

        else if(hareket==7){
            var sanalnokta={
                x:results.poseWorldLandmarks[23].x,
                y:-(results.poseWorldLandmarks[23].y*1.25),
            };
                var angle=  Math.abs(90-dereceHesapla(sanalnokta,results.poseWorldLandmarks[23],results.poseWorldLandmarks[11]));
                var angle2=  Math.abs(90-dereceHesapla(sanalnokta,results.poseWorldLandmarks[23],results.poseWorldLandmarks[15]));
                canvasText(angle,"blue",canvasElement.width*0.39,canvasElement.height*0.70);//derece ekranda gösterme
                canvasText(angle2,"red",canvasElement.width*0.51,canvasElement.height*0.58);//derece ekranda gösterme
                // canvasDot(sanalnokta.x,sanalnokta.y,"blue");
                //sanalnokta 23 11 
                //
                 angles.push(angle);
                 angles.push(angle2);
        }
        //8_l ve 8_r asagida

        else if(hareket==9){
            var sanalx=results.poseLandmarks[23].x*-0.08;
            var sanaly=results.poseLandmarks[23].y;
            var angle=180-dereceHesapla(results.poseLandmarks[23],results.poseLandmarks[27],{
                x:sanalx,
                y:sanaly,
            });
            
            angles.push(angle);
            canvasDot(sanalx,sanaly,"blue");
            canvasText(angle,"red",canvasElement.width*0.39,canvasElement.height*0.70);


            var sanalx=results.poseLandmarks[23].x;
            var sanaly=results.poseLandmarks[23].y*-0.08;
    
            var sanalnokta={
                x:sanalx,
                y:sanaly,
            };
            var angle=90-dereceHesapla(results.poseLandmarks[11],results.poseLandmarks[23],sanalnokta);
            
            canvasText(angle,"yellow",canvasElement.width*0.52,canvasElement.height*0.70);
            canvasDot(sanalnokta.x,sanalnokta.y,"black");
            angles.push(angle);

         }else if(hareket=="10_r"){
      
            var sanalnokta={
                x:results.poseLandmarks[16].x,
                y:results.poseLandmarks[12].y,
            };
            var sanalnokta2={
                x:results.poseLandmarks[27].x,
                y:results.poseLandmarks[23].y,
            };
            var angle=dereceHesapla(results.poseLandmarks[16],results.poseLandmarks[12],sanalnokta);
            var angle2=dereceHesapla(results.poseLandmarks[27],results.poseLandmarks[23],sanalnokta2);
            canvasDot(sanalnokta.x,sanalnokta.y,"red");
            canvasDot(sanalnokta2.x,sanalnokta2.y,"yellow");
            canvasText(angle,"red",canvasElement.width*0.40,canvasElement.height*0.70);
            canvasText(angle2,"yellow",canvasElement.width*0.60,canvasElement.height*0.70);
            angles.push(angle);
            angles.push(angle2);
         }else if(hareket=="10_l"){

            var sanalnokta={
                x:results.poseLandmarks[15].x,
                y:results.poseLandmarks[11].y,
            };
            var sanalnokta2={
                x:results.poseLandmarks[28].x,
                y:results.poseLandmarks[24].y,
            };
            var angle=dereceHesapla(results.poseLandmarks[15],results.poseLandmarks[11],sanalnokta);
            var angle2=dereceHesapla(results.poseLandmarks[28],results.poseLandmarks[24],sanalnokta2);
            canvasDot(sanalnokta.x,sanalnokta.y,"red");
            canvasDot(sanalnokta2.x,sanalnokta2.y,"yellow");
            canvasText(angle,"red",canvasElement.width*0.40,canvasElement.height*0.70);
            canvasText(angle2,"yellow",canvasElement.width*0.60,canvasElement.height*0.70);
            angles.push(angle);
            angles.push(angle2);
            
         }
        
    }
    return angles;
}

function canvasText(text,renk,x,y){
    canvasCtx.font = "20px Arial";
    canvasCtx.fillStyle = renk;
    canvasCtx.fillText(text,x,y);
}

function canvasLine(p1,p2){ 
    canvasCtx.beginPath();
    canvasCtx.moveTo(canvasElement.x* p1.x,canvasElement.y*  p1.y);
    canvasCtx.lineTo(canvasElement.x* p2.x,canvasElement.y*  p2.y);
    canvasCtx.stroke();
}


function canvasDot(x,y,renk){
    canvasCtx.fillStyle = renk;
    canvasCtx.fillRect(canvasElement.width*x,canvasElement.height*y,10,10); 
}

 

let activeEffect = 'mask';
var POSE_CONNECTIONS=[[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
var POSE_LANDMARKS ={NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
var POSE_LANDMARKS_LEFT={LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
var POSE_LANDMARKS_RIGHT= {RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
var POSE_LANDMARKS_NEUTRAL = {NOSE:0};
 
var hesaplancakDereceler=[];
var hareketno=-1;
 
var totalFrame=0;
var totalFps=0;

function hareketsonlandir(hareketNo){
    var ortalamaFps=totalFps/totalFrame;

    socket.emit('sessionend',
    {
        hareketno:hareketNo,
        ortalamafps:ortalamaFps,
        totalframe:totalFrame
    });
    $(".hareket"+hareketno).addClass("done");

}
function hepsiniKapat(){
    $(".hareket").removeClass("yes").addClass("no");
}

$(function(){
 
    $(".control-panel").find(".control-panel").append( $(".butonlarim").html());
    $(".hareket").on("click",function(){
        hepsiniKapat();
        $(this).removeClass("no").removeClass("done").addClass("yes");
    })
    $(".hareketbitir").on("click",function(){
        hepsiniKapat();
       
        hareketsonlandir(hareketno);
    })
    $(".hareket:not(.hareket3):not(.hareket8_r):not(.hareket8_l):not(.hareket9):not(.hareket10):not(.hareket1):not(.hareket2_l):not(.hareket4):not(.hareket5):not(.hareket6):not(.hareket7):not(.hareket2_r):not(.hareket10_r):not(.hareket10_l)").on("click",function(){
        POSE_CONNECTIONS=[[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {NOSE:0};
        grid.isRotating=true;
        hesaplancakDereceler=[];
        hareketno=-1;
    })
    $(".hareket1").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        hareketno="1";

    })

    $(".hareket2_r").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        hareketno="2_r";

    })
    $(".hareket2_l").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        
        hareketno="2_l";

    })
    $(".hareket3").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],
        /*,[12,14],[14,16],[16,18],[16,20],[16,22],[18,20]*/
        [11,23],/*[12,24],[23,24],*/[23,25],
        /*[24,26],*/[25,27],[26,28],[27,29],
        /*[28,30],*/
        [29,31],
        /*,[30,32],*/[27,31]/*,[28,32]*/];
        POSE_LANDMARKS ={NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32*/};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
        grid.isRotating=false;
        hesaplancakDereceler=
        [
            {
                p1:11,
                p2:23,
                p3:27,
                showposx:0.39,
                showposy:0.69,
                showtextcolor:"red",
            },              
            {
                p1:23,
                p2:25,
                p3:27,
                showposx:0.52,
                showposy:0.70,
                showtextcolor:"yellow",
            }

        ];
        hareketno=3;

    })
    $(".hareket4").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        
        hareketno=4;

    })

    $(".hareket5").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        
        hareketno=5;

    })
    $(".hareket6").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        
        hareketno=6;

    })
    $(".hareket7").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        
        hareketno=7;

    })
    $(".hareket8_r").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        hesaplancakDereceler=
        [
                       
            {
                p1:12,
                p2:24,
                p3:26,
                showposx:0.52,
                showposy:0.70,
                showtextcolor:"yellow",
            }

        ];
        hareketno="8_r";

    })
    $(".hareket8_l").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;
        hesaplancakDereceler=
        [
                       
            {
                p1:11,
                p2:23,
                p3:25,
                showposx:0.52,
                showposy:0.70,
                showtextcolor:"yellow",
            }

        ];
        hareketno="8_l";

    })
    $(".hareket9").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28]/*,[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]*/];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,/*LEFT_HEEL:29,LEFT_FOOT_INDEX:31*/};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,/*RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32*/};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
   
        grid.isRotating=false;

        hareketno=9;

    })
    $(".hareket10_l").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
        grid.isRotating=false;
        hareketno="10_l";
    })
    $(".hareket10_r").click(function(){
        POSE_CONNECTIONS=[/*[0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],*/[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]];
        POSE_LANDMARKS ={/*NOSE:0,LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,LEFT_EAR:7,RIGHT_EAR:8,LEFT_RIGHT:9,RIGHT_LEFT:10,*/LEFT_SHOULDER:11,RIGHT_SHOULDER:12,LEFT_ELBOW:13,RIGHT_ELBOW:14,LEFT_WRIST:15,RIGHT_WRIST:16,LEFT_PINKY:17,RIGHT_PINKY:18,LEFT_INDEX:19,RIGHT_INDEX:20,LEFT_THUMB:21,RIGHT_THUMB:22,LEFT_HIP:23,RIGHT_HIP:24,LEFT_KNEE:25,RIGHT_KNEE:26,LEFT_ANKLE:27,RIGHT_ANKLE:28,LEFT_HEEL:29,RIGHT_HEEL:30,LEFT_FOOT_INDEX:31,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_LEFT={/*LEFT_EYE_INNER:1,LEFT_EYE:2,LEFT_EYE_OUTER:3,LEFT_EAR:7,LEFT_RIGHT:9,*/LEFT_SHOULDER:11,LEFT_ELBOW:13,LEFT_WRIST:15,LEFT_PINKY:17,LEFT_INDEX:19,LEFT_THUMB:21,LEFT_HIP:23,LEFT_KNEE:25,LEFT_ANKLE:27,LEFT_HEEL:29,LEFT_FOOT_INDEX:31};
        POSE_LANDMARKS_RIGHT= {/*RIGHT_EYE_INNER:4,RIGHT_EYE:5,RIGHT_EYE_OUTER:6,RIGHT_EAR:8,RIGHT_LEFT:10,*/RIGHT_SHOULDER:12,RIGHT_ELBOW:14,RIGHT_WRIST:16,RIGHT_PINKY:18,RIGHT_INDEX:20,RIGHT_THUMB:22,RIGHT_HIP:24,RIGHT_KNEE:26,RIGHT_ANKLE:28,RIGHT_HEEL:30,RIGHT_FOOT_INDEX:32};
        POSE_LANDMARKS_NEUTRAL = {/*NOSE:0*/};
        grid.isRotating=false;
        hareketno="10_r";
    })





})

 



const controls = window;
const LandmarkGrid = window.LandmarkGrid;
const drawingUtils = window;
const mpPose = window;
const mpHolistic = window;
const config = { locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
        `${mpHolistic.VERSION}/${file}`;
} };

const options = {
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}/${file}`;
    }
};

 
// Our input frames will come from here.
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

const landmarkContainer = document.getElementsByClassName('landmark-grid-container')[0];


const grid = new LandmarkGrid(landmarkContainer, {
    connectionColor: 0xCCCCCC,
    definedColors: [{ name: 'LEFT', value: 0xffa500 }, { name: 'RIGHT', value: 0x00ffff }],
    range: 2,
    fitToGrid: true,
    labelSuffix: 'm',
    landmarkSize: 2,
    numCellsPerAxis: 4,
    showHidden: false,
    centered: true,
});

var landMarks=[];
var sayi=0;
//grid.rotation
function onResults(results) {




    totalFrame++;
    totalFps+=fpsControl.counter;
    gresults=results;

    
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);


  

    if (results.segmentationMask) {
        //burda image var ciziyor 
        canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
        // Only overwrite existing pixels.
        if (activeEffect === 'mask' || activeEffect === 'both') {
            canvasCtx.globalCompositeOperation = 'source-in';
     
            canvasCtx.fillStyle = '#00FF007F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        else {
            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = '#0000FF7F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = 'source-over';
    }
    else {
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    }
    
    if (results.poseLandmarks) {
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { visibilityMin: 0.65, color: 'white' });
        drawingUtils.drawLandmarks(canvasCtx, Object.values(POSE_LANDMARKS_LEFT)
            .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });
        drawingUtils.drawLandmarks(canvasCtx, Object.values(POSE_LANDMARKS_RIGHT)
            .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });
        drawingUtils.drawLandmarks(canvasCtx, Object.values(POSE_LANDMARKS_NEUTRAL)
            .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'white' });
        var angles=[];
        if(hareketno==9 || hareketno==1 || hareketno=="2_l" || hareketno=="2_r"|| hareketno=="5" ||hareketno==6 ||hareketno==7||hareketno==4||hareketno=="10_l"||hareketno=="10_r"){
            angles= dereceHesapla2(results,hareketno);
        }else{
            hesaplancakDereceler.forEach(function(h){
                var angle=0;
               
                angle= dereceHesapla(results.poseLandmarks[h.p1],results.poseLandmarks[h.p2],results.poseLandmarks[h.p3]);
                if((hareketno=="8_r" || hareketno=="8_l") && angle>90){
                    angle=180-angle;
                }
                canvasCtx.font = "20px Arial";
                canvasCtx.fillStyle = h.showtextcolor;
                canvasCtx.fillText(angle,canvasElement.width*h.showposx,canvasElement.height*h.showposy);
                angles.push(angle);
            });
        }


     
         
      
        var resultsr= {
            user:uname,
            i:sayi++,
            results: {
                moveno:hareketno,
                angle:angles,
        
            }
        };
        sonresultsr=resultsr;

        if(logresults){
            console.log(resultsr);
        }
        
        socket.emit('results',resultsr);
    }

    
    canvasCtx.restore();
    if (results.poseWorldLandmark ) {
        grid.updateLandmarks(results.poseWorldLandmarks, POSE_CONNECTIONS, [
            { list: Object.values(POSE_LANDMARKS_LEFT), color: 'LEFT' },
            { list: Object.values(POSE_LANDMARKS_RIGHT), color: 'RIGHT' },
        ]);
    }
    else {
        grid.updateLandmarks([]);
    }
  
}
const pose = new mpPose.Pose(options);
pose.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls.ControlPanel(controlsElement, {
    selfieMode: false,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    effect: 'background',  
    modelComplexity: 1,
 
})
    .add([
    new controls.StaticText({ title: 'HBCU' }),
    fpsControl,
    //new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new controls.SourcePicker({
        onSourceChanged: () => {
            // Resets because this model gives better results when reset between
            // source changes.
            pose.reset();
        },
        onFrame: async (input, size) => {
            const aspect = size.height / size.width;
            let width, height;
            if (window.innerWidth > window.innerHeight) {
                height = window.innerHeight;
                width = height / aspect;
            }
            else {
                width = window.innerWidth;
                height = width * aspect;
            }
            canvasElement.width = width;
            canvasElement.height = height;
            await pose.send({ image: input });
        },
    }), 
    /*new controls.Slider({
        title: 'Model Complexity',
        field: 'modelComplexity',
        discrete: ['Lite', 'Full', 'Heavy'],
    }),
    new controls.Toggle({ title: 'Smooth Landmarks', field: 'smoothLandmarks' }),
    new controls.Toggle({ title: 'Enable Segmentation', field: 'enableSegmentation' }),
     new controls.Toggle({ title: 'Smooth Segmentation', field: 'smoothSegmentation' }),
    new controls.Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
    })
    new controls.Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
        title: 'Effect',
        field: 'effect',
        discrete: { 'background': 'Background', 'mask': 'Foreground' },
    }),*/
])
    .on(x => {
    const options = x;
    videoElement.classList.toggle('selfie', options.selfieMode);
    activeEffect = x['effect'];
    pose.setOptions(options);
});
