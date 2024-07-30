import cv2 
import os

use_custom_haar_env_var = "USE_CUSTOM_HAAR"
use_custom_haar = os.getenv(use_custom_haar_env_var)

is_custom_haar = False
haarFilename = ""

if use_custom_haar is None or use_custom_haar == "false" or use_custom_haar == "f":
    haarFilename = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
else:
    is_custom_haar = True
    haarFilename = os.getcwd()+'/face_detection/haarcascades/haarcascade_frontalface_alt2.xml'

faceCascade = cv2.CascadeClassifier(haarFilename)

def detect_faces(frame: any):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray, 1.3, 5)
    haarText = "Using default Haar"
    haarpathText = "{}".format(haarFilename)
    if is_custom_haar == True:
        haarText = "Using custom Haar".format(haarFilename)
    cv2.putText(frame, haarText, (10, 10),
			cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 255, 0), 1)
    cv2.putText(frame, haarpathText, (10, 28),
			cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 255, 0), 1)
    for x,y,w,h in faces:
        text = "Face Detected"
        positionText = "Position {}: {}".format(x, y)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 3)
        cv2.putText(frame, text, (x, y-20),
			cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255,0 , 0), 1)
        cv2.putText(frame, positionText, (x, y-8),
			cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 255, 0), 1)
    return frame, True