import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  item?: Maybe<Item>;
  items?: Maybe<Array<Item>>;
};


export type QueryItemArgs = {
  id: Scalars['Int'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  largeImage?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
};


export type MutationCreateItemArgs = {
  input: ItemInput;
};

export type ItemInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  largeImage?: Maybe<Scalars['String']>;
};

export type CreateItemMutationVariables = Exact<{
  input: ItemInput;
}>;


export type CreateItemMutation = (
  { __typename?: 'Mutation' }
  & { createItem: (
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'title' | 'description' | 'price' | 'image' | 'largeImage' | 'createdAt' | 'updatedAt'>
  ) }
);

export type ItemQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ItemQuery = (
  { __typename?: 'Query' }
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'title' | 'description' | 'price' | 'image' | 'largeImage'>
  )> }
);

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<Array<(
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'title' | 'description' | 'price' | 'image' | 'largeImage'>
  )>> }
);


export const CreateItemDocument = gql`
    mutation CreateItem($input: ItemInput!) {
  createItem(input: $input) {
    id
    title
    description
    price
    image
    largeImage
    createdAt
    updatedAt
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, baseOptions);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const ItemDocument = gql`
    query Item($id: Int!) {
  item(id: $id) {
    id
    title
    description
    price
    image
    largeImage
  }
}
    `;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemQuery(baseOptions?: Apollo.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        return Apollo.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
      }
export function useItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          return Apollo.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = Apollo.QueryResult<ItemQuery, ItemQueryVariables>;
export const ItemsDocument = gql`
    query Items {
  items {
    id
    title
    description
    price
    image
    largeImage
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;