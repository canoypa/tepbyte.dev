import Link from 'next/link';
import { Button } from '~/components/button';
import { MainContents } from '~/features/main_contents';

export default async function NotFound() {
  return (
    <MainContents>
      <div className="flex flex-col gap-4">
        <h1 className="text-display-medium">404 Not Found</h1>
        <p className="text-body-large text-on-surface-variant">
          There seems to be nothing here.
        </p>
      </div>

      <span>
        <Button as={Link} href="/" label="Back to Top Page" />
      </span>
    </MainContents>
  );
}
