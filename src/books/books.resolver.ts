import {
  Args,
  Field,
  ID,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {Author} from '../authors/entity/author.entity';
import {Series} from '../series/entity/series.entity';
import {BooksService} from './books.service';
import {Book} from './schema/book.schema';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private bookService: BooksService) {}

  @Query(() => Book, {nullable: false})
  async book(@Args('id', {type: () => ID}) id: string) {
    return this.bookService.getBook(id);
  }

  @ResolveField(() => ID)
  id(@Parent() book: Book): string {
    return book._id;
  }

  @Query(() => [Book])
  async allBooks() {
    return this.bookService.all();
  }

  @ResolveField((of) => String)
  async cover(@Parent() book: Book): Promise<string | null> {
    return this.bookService.bookcover(book);
  }

  @ResolveField((of) => [BookAuthorConnection])
  async authors(@Parent() book: Book) {
    return this.bookService.authors(book);
  }

  @ResolveField((of) => [Series])
  async series(@Parent() book: Book) {
    return this.bookService.series(book);
  }
}

@ObjectType()
export class BookAuthorConnection {
  @Field(() => [String], {nullable: true})
  roles?: string[];

  @Field(() => Author)
  author!: Author;
}

@Resolver(() => BookAuthorConnection)
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthorConnectionResolver {}
