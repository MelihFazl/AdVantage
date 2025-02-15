# AdVantage 
2023-2024 Senior Design Project at Bilkent University

### 📃 Group Members
- [Utku Kurtulmuş 21903025](https://github.com/UK628)
- [Kutay Şenyiğit 21902377](https://github.com/trelans)
- [Kerem Şahin 21901724](https://github.com/KeremSahin22)
- [Melih Fazıl Keskin 21901831](https://github.com/MelihFazl)
- [Miray Ayerdem 21901987](https://github.com/mirayayerdem)

### 🔗 Reports & Detailed Information
If you want to get detailed explanation on our architecture, use of machine learning models and presentations of the project, please check out our project website https://keremsahin22.github.io/ . 

### 🖋️ Description
AdVantage is an innovative application that analyzes top-performing internet advertisements, providing advertisers with strategies in line with trends and market dynamics. It is created for marketing professionals and developers seeking optimized digital advertising. Our platform streamlines the trial-and-error process, offering data-driven insights to enhance ad content and concepts. By leveraging innovative machine learning algorithms, we predict ad success rates and revolutionize the advertising process by giving recommendations according to the current trends analyzed from related and successful ads without the need for large marketing budgets, setting us apart from the competition.  

### 🛠️ How to install
Currently, we stopped deploying our application on AWS because of monetary costs. Therefore, you need to download source code from github. When it is downloaded, you need Database secrets to use it. Please communicate with us for secrets.

Once you have obtained the necessary secrets, locate the configuration file(s) within the downloaded source code.
Update the database configuration with the provided secrets. This typically involves modifying configuration files such as application.properties for the Spring Boot backend.
Open your preferred Integrated Development Environment (IDE) such as IntelliJ IDEA, Eclipse, or Spring Tool Suite.
Import the backend Spring Boot project into your IDE.
Once imported, locate the main application file (e.g., Application.java) and run it within your IDE.
The backend application should now be running. Ensure that it successfully connects to the database using the provided secrets.

To run machine learning models, you need to go to the directory where dockers are. There is two model. In each directory you need to run `docker compose up --build` command.


Open your command line interface (CLI) or terminal.
Navigate to the directory where you extracted the frontend React application.
Once inside the directory, type npm start command:
This command will start the development server for the React application.
After the server has started successfully, open a web browser and go to http://localhost:3000 to view the application.
You should now be able to interact with the frontend of the application.


