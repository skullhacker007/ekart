'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocsPage() {
  return (
    <div style={{ padding: '0' }}>
      <SwaggerUI
        url="/api/docs"
        docExpansion="list"
        defaultModelsExpandDepth={1}
        persistAuthorization={true}
        displayRequestDuration={true}
        filter={true}
      />
    </div>
  );
}
