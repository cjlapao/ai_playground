import cv2
from face_detector import detect_faces
import cv2 
import os
  
def returnCameraIndexes():
    # checks the first 10 indexes.
    index = 0
    arr = []
    i = 10
    while i > 0:
        cap = cv2.VideoCapture(index)
        if cap.read()[0]:
            arr.append(index)
            cap.release()
        index += 1
        i -= 1
    return arr

webcams = returnCameraIndexes()
if len(webcams) == 0:
    raise ValueError("Could not detect any webcam")

camIndex = webcams[0]

cap = cv2.VideoCapture(camIndex) 

while True:
    frame, success = detect_faces(cap)
    if not success: continue

    cv2.imshow("Face Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

