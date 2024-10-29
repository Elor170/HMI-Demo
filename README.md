# HMI-Demo

A demo for HMI architecture

## Installation

### Dependencies

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/) (Only for online installation)

## How To Run

### Before you begin

Rename the `.env.example` file to `.env` and change the data there according to your installation-environment.
zsIt's also important to make sure that your machine has a way to run docker-compose files.

### Dev Build

In root of the repo, run the following command:

```shell
docker compose -f ./docker-compose.dev.yml up -d
```

This should start your entire dev environment. You can then access the frontend through the provided port you've wrote in the `.env` file.

### Production Build

#### If you're running offline

Make sure to install all of the docker images on your offline environment before proceeding.
You can install a docker image offline by using the following command:

```bash
sudo docker load -i <Image file name>.docker
```

#### Setup Frontend Server

In your frontend environment, run the following command:

```bash
docker compose -f ./docker-compose.prod.frontend.yml up -d
```

Now the frontend server should start automatically when the machine boots up.

#### Setup Backend Server

In your backend environment, run the following command:

```bash
docker compose -f ./docker-compose.prod.backend.yml up -d
```

Now the backend server should start automatically when the machine boots up.

# Pull Request/Pushing To Main

## Pull Request

When pushing a pull request/a branch to main, we highly recommend to you squish your branch into one pull request, with a general title, and the description as the changelog. Make sure to write your title in a way that would `correctly bump the version` as described in the section bellow.

## Bumping

[source](https://github.com/mathieudutour/github-tag-action?tab=readme-ov-file#bumping)

The action will parse the new commits since the last tag using the [semantic-release](https://github.com/semantic-release/semantic-release) conventions.

semantic-release uses the commit messages to determine the type of changes in the codebase. Following formalized conventions for commit messages, semantic-release automatically determines the next [semantic version](https://semver.org) number.

By default semantic-release uses [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

Here is an example of the release type that will be done based on a commit messages:

<table>
<tr>
<td> Commit message </td> <td> Release type </td>
</tr>
<tr>
<td>

```
fix(pencil): stop graphite breaking when too much pressure applied
```

</td>
<td>Patch Release</td>
</tr>
<tr>
<td>

```
feat(pencil): add 'graphiteWidth' option
```

</td>
<td>Minor Release</td>
</tr>
<tr>
<td>

```
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed.
The default graphite width of 10mm is always used for performance reasons.
```

</td>
<td>Major Release</td>
</tr>
</table>

### In case of no commit message

If no commit message contains any information, then the bump would be considered as major release by default.
