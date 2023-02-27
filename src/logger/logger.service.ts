import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: any) {
    console.log(`\u001b[1;34m LOG --\u001b[0;37m ${message}`);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(
      `\u001b[1;31m ERROR --\u001b[0;37m ${message} --\u001b[0;37m ${optionalParams}`,
    );
  }

  warn(message: any) {
    console.log(`\u001b[1;33m WARN --\u001b[0;37m ${message}`);
  }

  debug?(message: any) {
    console.log(`\u001b[1;35m DEBUG --\u001b[0;37m ${message}`);
  }

  verbose?(message: any) {
    console.log(`\u001b[1;36m VERBOUSE --\u001b[0;37m ${message}`);
  }
}
