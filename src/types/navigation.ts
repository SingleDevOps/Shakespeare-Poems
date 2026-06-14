import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export interface Poem {
  id: string;
  title: string;
  author: string;
  poem: string;
  like?: boolean;
}

export type RootStackParamList = {
  'Shakespeare Poems': undefined;
  Poems: undefined;
  PoemDetail: { poem: Poem };
  AmazeMe: undefined;
  LikedPoem: undefined;
};

export type NavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
};
