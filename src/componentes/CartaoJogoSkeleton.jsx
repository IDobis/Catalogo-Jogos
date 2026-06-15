import { Card, CardContent, Skeleton, Stack } from "@mui/material";

function CartaoJogoSkeleton() {
  return (
    <Card sx={{ height: "100%" }} aria-hidden="true">
      <Skeleton variant="rectangular" sx={{ aspectRatio: "3 / 4" }} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 1 }} />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={100} height={24} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CartaoJogoSkeleton;
