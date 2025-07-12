import * as cdk from 'aws-cdk-lib';
import { MyEc2AppStack } from '../aws/backend-stack.js';

const app = new cdk.App();
new MyEc2AppStack(app, 'MyEc2AppStack');
