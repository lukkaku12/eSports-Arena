import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity'; // Adjust the path as needed
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>, // Injecting Result repository
  ) {}

  // Method to create a new result
  async create(createResultDto: CreateResultDto): Promise<Result> {
    const result = this.resultRepository.create(createResultDto); // Create a new result instance
    return await this.resultRepository.save(result); // Save the result to the database
  }

  // Method to find all results
  async findAll(): Promise<Result[]> {
    const results = await this.resultRepository.find(); // Fetch all results from the database
    if (!results.length) {
      throw new NotFoundException('No results found'); // Throw an error if no results exist
    }
    return results; 
  }

}