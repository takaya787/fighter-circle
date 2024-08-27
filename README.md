# Fighter-Circle

## プロジェクト概要

**Fighter-circle** は、格闘技愛好者向けに開発された SNS です。スパーリング動画などの活動を簡単に共有し、同じ格闘技に情熱を持つ仲間と繋がることができます。練習者、コーチ、ファンなど、誰でも参加できるコミュニティを提供します。

**キャッチフレーズ:**  
あなたの格闘技サークルがこの中に！  
一緒に格闘技を楽しむ仲間を見つけよう！

## 使用技術

-   **TypeScript**: 全てのコードは TypeScript で記述されており、強力な型安全性とメンテナンス性が確保されています。
-   **フロントエンド**: **Next.js 14** を使用しており、強力でスケーラブルな React アプリケーションのレンダリングを提供します。routign App router を採用しています。
-   **バックエンド**: TypeScript で開発され、**AWS Lambda** によって効率的でサーバーレスな運用が可能です。
-   **データベース**: DynamoDB を用いて開発されています。低コストでスケーラブルな開発が可能です
-   **動画編集**: 投稿された動画を Streaming に対応できるように**AWS Media Convert**を用いた、動画編集を実施しています。

## インフラ構成

-   **ホスティング**: フロントエンドは **AWS Amplify Hosting** にホストされており、サーバーは **AWS SAM** (Serverless Application Model) を使用して管理されています。
-   **CI/CD**: 継続的インテグレーション (CI) と継続的デプロイ (CD) は AWS のサービスを活用しており、AWS SAM を利用することで、開発環境と本番環境を分離してスムーズなデプロイを実現しています。

## 主な機能

-   **動画共有**: 専用の格闘技コミュニティ内でスパーリング動画をアップロード・共有する機能。

## アプリの利用方法

### アプリへのアクセス

以下のリンクからデプロイされたアプリケーションにアクセスできます:

[Application URL](https://master.dh57he0tjj5rg.amplifyapp.com/)

### ローカル環境での実行方法

アプリケーションをローカルでセットアップして実行する手順は以下の通りです。

#### ステップ 1: Docker の設定

以下のコマンドを実行して Docker が正しく設定されていることを確認してください:

```sh
sudo ln -s ~/.docker/run/docker.sock /var/run/docker.sock
```

#### ステップ 2: ローカルでの API・Fronend 起動方法

ローカル環境で API を起動するには、次のコマンドを使用します:

```sh
npm run local:start
```

ローカル環境で Next js を起動するには、`front/`ディレクトリー下で次のコマンドを使用します:

```sh
npm run dev
```

#### ステップ 3:ローカルでの API 変更の追跡方法

ローカル環境で API の変更を追跡するには、次のコマンドを使用します:

```sh
npm run local:watch
```

watch と start のコマンドは、別々のタブで同時に実行する必要があります。

# 以下は AWS SAM の説明

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

-   hello-world - Code for the application's Lambda function written in TypeScript.
-   events - Invocation events that you can use to invoke the function.
-   hello-world/tests - Unit tests for the application code.
-   template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

If you prefer to use an integrated development environment (IDE) to build and test your application, you can use the AWS Toolkit.
The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds a simplified step-through debugging experience for Lambda function code. See the following links to get started.

-   [CLion](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [GoLand](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [WebStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [Rider](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [PhpStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [RubyMine](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [DataGrip](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
-   [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
-   [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

-   SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
-   Node.js - [Install Node.js 20](https://nodejs.org/en/), including the NPM package management tool.
-   Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

-   **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
-   **AWS Region**: The AWS region you want to deploy your app to.
-   **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
-   **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
-   **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
ts-hello$ sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
ts-hello$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
ts-hello$ sam local start-api
ts-hello$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
Events:
    HelloWorld:
        Type: Api
        Properties:
            Path: /hello
            Method: get
```

## Add a resource to your application

The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
ts-hello$ sam logs -n HelloWorldFunction --stack-name ts-hello --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `hello-world/tests` folder in this project. Use NPM to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
ts-hello$ cd hello-world
hello-world$ npm install
hello-world$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name ts-hello
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
