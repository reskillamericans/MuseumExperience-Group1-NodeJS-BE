# Museum App

Welcome!

- To begin, you would need to create a fork of the repository https://github.com/reskillamericans/MuseumExperience-Group1-NodeJS-BE.git`
- You can then clone the forked repository on your local computer.
- Each feature you work on will be done in a separate branch. Each new branc should be named by the feature being worked on. You can use namings like "feature/newsLetter".
  To create a new branch, run `git checkout -b branch_name` (where branch_name is the name of the new branch being created.)

### Staying Updated
When working with many people on the same codebase, sometimes others make changes that affect your work. While great care has been taken to create a modular team workflow to keep this to a minimum, merge conflicts are inevitable. It would not be nice to finish working on a task or feature, only to find that the codebase has evolved and you need to rework everything to conform to the new changes. This is managed in two ways.       
__*First*__, make sure your understand the folder structure and stick to it.      
__*Second*__, each team member needs to make sure that at every given time, their working directory is up-to-date with the latest changes from the upstream *development* branch. This is achieved with a two-fold process.       
#### Pulling Upstream
After setting up your fork on github and cloning it locally on your system, you'll need to run a command just once to create a connection between your local repository and the remote upstream repository. Note that there's automatically a remote 'origin' repository set up when you clone. This points to your fork. Now you need to set up 'upstream' which will point to the central upstream repo.

- Open a terminal and go into the directory for the newly cloned repo. Now add the upstream remote like so:        
    <pre>git remote add upstream https://github.com/reskillamericans/MuseumExperience-Group1-NodeJS-BE.git</pre>
PS: *You may get an error saying the `upstream` remote has already been configured. If so, then you are good to go.*   

Now you're all set up.       
__*The following steps must be run periodically to keep your work up-to-date! You can run these commands as often as possible. You want to fetch any new changes as soon as possible. Each time you want to begin working, or take a break from your work, run these first.*__     
Be sure to  commit all local changes first. 

1. Switch to the development branch        
    <pre>git checkout development</pre>     
2. Get all remote upstream changes into your local computer.        
    <pre>git fetch upstream</pre>     
3. Merge changes fetched with your local development branch. ('development' must be the currently checked-out branch)       
    <pre>git merge upstream/development</pre>    
4. Push the newly merged changes to your fork's remote (online) repo. This is configured as 'origin' by default.    
    <pre>git push origin development</pre>      

If you've created a new branch to work on rather than working directly on `development`, then run the next steps.

5. Switch to your feature branch.        
    <pre>git checkout your-feature-branch</pre>        
6. Merge the changes on the newly merged development branch, into your feature branch.        
    <pre>git merge development</pre>
    *You may encounter merge conflicts here.
    [Resolve them](https://help.github.com/en/articles/resolving-a-merge-conflict-using-the-command-line),
    then come back and complete the merge. If you merge often enough, any conflicts would be trivial and very few.*

7. Finally, push your newly merged feature branch to the remote github server for backup.
    <pre>git push origin your-feature-branch</pre>   


##### Pull Requests
Once you are done working on your feature, you may go on to https://github.com/reskillamericans/MuseumExperience-Group1-NodeJS-BE.git to create apull request between your fork and the project repo.


*The git procedures may look like a lot at first glance. It's okay. You've still got this. You will get a hang of it in no time*
##### This will be the file and folder structure

    src 
    ├── controllers  
    ├── database  
    ├── middlewares 
    ├── models 
    ├── routes   
    ├── services  
    └── views                     
<hr/>


  ## Running the server

- Don't forget to 'npm install' after cloning the project!
- Make sure to have a .env file with the information in the *.env.example* file. If at any point, your feature requires you to add a new env variable, be sure to include it in *.env.example* so that others can see and use it too

- Command lines to start the server
  - To start server in development mode: 'npm run dev'
  - To start server in production mode: 'npm run prod'

All the best!
