## Microservice Setup
2. Make sure Docker is installed on your computer. Easiest way would be to install Docker Desktop: https://www.docker.com/products/docker-desktop/
3. Navigate to the cloned GitHub Repository. Make sure Docker is running and after that, you can directly run ```docker compose up --build``` command to build your image and run the web service. 
4. After the image is built, the web service will run automatically. You can then interact with the REST API (see more on API Usage). 
5. When you are done, you can close the server with ```CTRL+C```.
6. After these steps, you can directly use the ```  ``` command to run the server for future usage.

## API Usage.
There are three easy ways to test out the microservice. To test manually, you can either use Postman or FastAPI's own web interface. As a third option, to automate the process, you can run the python script to validate the microservice is working as expected.

### Postman
1. Run the server.
2. Open up Postman, and create a new collection.
3. Right click on the "New Collection" and click on the "Add Request". Then, select the POST request.
4. Enter the ```http://localhost:8000/text_ad/predict``` URL.
5. Go to Body, and select the raw. Use the JSON format and the 'text_ad' key and enter the value.
6. Click on the "Send" button, and you should receive the response in JSON format.
