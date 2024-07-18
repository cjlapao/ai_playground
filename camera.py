# import the opencv library 
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

# define a video capture object 

vid = cv2.VideoCapture(returnCameraIndexes()[0]) 

cascPath = os.getcwd()+'/haarcascades/haarcascade_frontalface_alt2.xml'
faceCascade = cv2.CascadeClassifier(cascPath)

while(True): 
      
    # Capture the video frame 
    # by frame 
    ret, frame = vid.read() 

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        text = "Position {}: {}".format(x, y)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(frame, text, (x, y-5),
			cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 0), 1)

    # Display the resulting frame 
    cv2.imshow('Video', frame) 
      
    # the 'q' button is set as the 
    # quitting button you may use any 
    # desired button of your choice 
    if cv2.waitKey(1) & 0xFF == ord('q'): 
        break
  
# After the loop release the cap object 
vid.release() 
# Destroy all the windows 
cv2.destroyAllWindows() 