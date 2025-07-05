import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipPipe implements PipeTransform {
  transform(value: string) {
    // console.log({value,metadata})

    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a avalid MongoID`);
    }

    return value;
  }
}
