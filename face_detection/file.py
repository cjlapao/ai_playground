import cv2
from face_detector import detect_faces
import os

while True:
    image = cv2.imread(os.getcwd()+'/face_detection/resources/family.png')
    if image is None: 
        print("Cannot read file")
        break

    frame, success = detect_faces(image)
    if not success: continue

    cv2.imshow("Face Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()