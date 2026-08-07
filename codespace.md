# Using GitHub Codespaces

## What is GitHub Codespaces?

GitHub Codespaces is a cloud-based development environment that allows you to run your code directly from within GitHub. It provides a fully-featured, configurable, and on-demand development environment that can be accessed from anywhere. With GitHub Codespaces, you can:

- Develop in a consistent environment across different machines.
- Quickly start coding without setting up your local environment.
- Use powerful cloud-based resources for development.

## How to Spin Up a Codespace Instance

Follow these steps to spin up a Codespace instance using the `devcontainer` file:

### Step 1: Navigate to Your Repository

1. Go to your repository on GitHub. In this case, navigate to [qldgov-sandbox/copilot-node-calculator](https://github.com/qldgov-sandbox/copilot-node-calculator).

### Step 2: Open Codespaces

2. Click on the `Code` button on the repository page.

![image](https://github.com/user-attachments/assets/5ecb1522-6106-4d8c-b2a3-28b969833c37)

3. Select the `Codespaces` tab.

![image](https://github.com/user-attachments/assets/078529d9-3f8c-4b53-b458-8f73ca36074c)

4. Click on `New codespace` to create a new Codespace.

![image](https://github.com/user-attachments/assets/cf2d0ec0-6183-4389-8158-2487055371fa)

### Step 3: Configure Your Codespace

5. GitHub Codespaces will automatically detect the `devcontainer.json` file in your repository and use it to set up your development environment. 

6. Wait for the Codespace to start. This might take a few minutes as it sets up the environment according to the configurations specified in the `devcontainer.json` file.

### Step 4: Start Coding

7. Once the Codespace is ready, you will be taken to a VS Code-like interface in your browser. You can now start coding in the environment that has been set up according to your `devcontainer.json` file.

![image](https://github.com/user-attachments/assets/e450ae7d-cfc3-4272-a498-22999b36d264)

### Step 5: Accessing Terminal and Other Features

8. You can access the terminal by clicking on the menu and selecting `View > Terminal`.

![image](https://github.com/user-attachments/assets/4e8eabc2-e9ae-48a0-8c21-a1fb60ebbcb2)

9. Use the terminal to run commands, install dependencies, and test your code.

### Additional Tips

- You can customize your development environment further by modifying the `devcontainer.json` file.
- Codespaces supports extensions, themes, and other VS Code features, which you can install to enhance your development experience.

## Conclusion

GitHub Codespaces provides a powerful and flexible development environment that you can access from anywhere. By following the steps above, you can quickly spin up a Codespace instance and start coding using the `devcontainer.json` file you created.
