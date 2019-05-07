/*
 - extractPath(path)

This method handles only samples hash paths.
It returns an object that are not well defined.
It should not be used in production environment.

- Cases that are specifically handled:

case root 1: URL:PORT (valid)
case root 2: #/ (valid)
case 0: #users (valid)
case 1: #users/:id (valid)
case 2: #users?page=foo (valid)

- Cases that aren't specifically handled:

case 3: #users?page=1&bar=foo (invalid)
case 4: # (invalid)
case 5: #users?page=1/foo (invalid)
case 6: #users/foo/bar?page=1 (invalid)
case 7: #users/:id/user (invalid)

*/

export const extractPath = async path => {
  const rootPath = '#/';
  if (path) {
    // case root 2
    if (path == rootPath) {
      return { view: path };
    }

    // case 1
    const [view, id, ...trash] = path.split('/');

    if (id) {
      return { view: view, id: id };
    }

    // case 2
    const [viewWithoutQuerys, querys] = view.split('?');

    if (querys) {
      const [query, ...remaining] = querys.split('&');
      const [key, value, ...trash] = query.split('=');

      if (key && value) {
        return { view: viewWithoutQuerys, key: key, value: value };
      }
    }

    // case 0
    return { view: viewWithoutQuerys };
  }
  // case root 1
  return { view: rootPath };
};
