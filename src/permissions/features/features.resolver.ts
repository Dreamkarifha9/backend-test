import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FeaturesService } from './features.service';
import { CreateFeatureInput } from './dto/create-feature.input';
import { UpdateFeatureInput } from './dto/update-feature.input';

@Resolver('Feature')
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Mutation('createFeature')
  create(@Args('createFeatureInput') createFeatureInput: CreateFeatureInput) {
    return this.featuresService.create(createFeatureInput);
  }

  @Query('features')
  findAll() {
    return this.featuresService.findAll();
  }

  @Query('feature')
  findOne(@Args('id') id: number) {
    return this.featuresService.findOne(id);
  }

  @Mutation('updateFeature')
  update(@Args('updateFeatureInput') updateFeatureInput: UpdateFeatureInput) {
    return this.featuresService.update(updateFeatureInput.id, updateFeatureInput);
  }

  @Mutation('removeFeature')
  remove(@Args('id') id: number) {
    return this.featuresService.remove(id);
  }
}
