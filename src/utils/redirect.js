import router from 'next/router';

const redirect = (params, location) => {
  const { ctx, status = 302 } = params;

  if (ctx.res) {
    // Seems to be the version used by zeit
    ctx.res.writeHead(status, {
      Location: location,
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8',
    });
    ctx.res.end();
    return;
  }

  router.replace(location);
};

export default redirect;
