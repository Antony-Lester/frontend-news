# Branching, Committing & Pulling

## <ins> Main Branch

When you create a new project on your local machine and initialise it as a **git** repository, it creates a **default branch** called **main**(it might be **master** depending on your git version). What this means is that any work that we now do will exist on this default branch locally. Assuming you have set a remote repository on **github**, if you were to make some changes to your code and wanted to update your remote repository to reflect those local changes, you would save your work and perform the following commands:

> - git add \<file name that has been modified\> <br><br>
> - git commit -m \<your commit message\> <br><br>
> - git push origin main

- **origin** here is a reference to your **remote** repository and **main** is reference to the main branch on your remote repository.

---

## <ins> Making a new branch

It would be perfectly normal to assume the application/project you are working on will have a multitude of features that need to be implemented. You may also not be the only person working on a project. If multple people were to make changes on their local machines and tried to push them up to the main branch of the same remote repository, github will give you back some errors that will need to be addressed before it will allow work to be pushed and there is a chance you could lose some work if you are not careful whilst fixing the multiple changes that have been made.

![alt text](./error.png)

Github provides us with a solution to this problem - **branching**. Branching allows us to make changes to our code in isolation without having them impact the **main** branch of a repository. This way, multiple people can work on different parts of a project and not worry about breaking code that someone else is working on. Once a task has been completed, it can then be merged into the **main** branch by making a **pull request**. Below is the list of commands you should run in order to create a new branch and the subsequent commands to push your work up to that branch.

## <ins> Commands

Step 1:

- We need to make sure that we **checkout** to the main branch locally, then we should **pull** from the remote **main** branch to make sure that our local main branch is up to date.

> git checkout main - checks out to the main branch locally
> <br><br>
> git pull origin main - pulling in the most recent changes from **main**

---

Step 2 :

- Once we have confirmation that we are up to date with the **main** branch, we can **checkout** to a new branch and start working from there.

> git checkout -b **\<branch name\>**

---

Step 3:

- Once you have completed your work on this task, you will need to commit your changes. Before pushing your changes to your remote repo, it is a good idea here to **pull from main** again, just incase any changes have been merged into the **main** branch from other branches. If there are changes you will have to address these **merge conflicts** before pushing. If there are no **merge conflicts** you can simply push your work to your remote repository, making sure you push to the branch you are working on - **not main!**

> - git add \<file name that has been modified\> <br><br>
> - git commit -m \<your commit message\> <br><br>
> - git pull origin main - **address merge conflicts if there are any**<br><br>
> - git push origin **\<branch name\>**

---

Step 4:

Once you have pushed your work to your main branch, if you head to your github repo, you will see the follow below. This will give you an oppurtunity to review the changes that have been made before merging them into the main branch.

![alt text](./pr.png)

For your backend project, you will send us the link for the **pull request** and we will review the changes you have made, before permitting you to merge it into the main branch.
