import { RouteConfig, StackRouteConfig } from '@types-fuse/routes';

interface StackRouteHandlerArgumants {
  route: RouteConfig;
  preReservedStacks: StackRouteConfig[];
  customPath?: string;
}

export function stackRouteHandler({
  route,
  customPath,
  preReservedStacks,
}: StackRouteHandlerArgumants): StackRouteConfig {
  const preReservedStack = preReservedStacks?.find(
    (stack) => stack.path === (customPath || route.path)
  );

  if (preReservedStack) return preReservedStack;

  const pathTitle = route.element
    ? route.title
    : route.children?.find((child) => child.path === '')?.title;

  return {
    title: pathTitle || '',
    path: customPath || route.path,
  };
}
