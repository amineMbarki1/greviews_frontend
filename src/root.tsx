import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAddressBook, IconSend2, IconTemplate } from "@tabler/icons-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Root() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink
            leftSection={<IconSend2 />}
            label="Compose"
            to={"/contacts"}
            component={Link}
          >
            <NavLink
              label="Text message"
              to={"/text-message/compose"}
              component={Link}
            />
            <NavLink label="Email" to="/email/compose" component={Link} />
          </NavLink>
          <NavLink label="Contacts" leftSection={<IconAddressBook />}>
            <NavLink label="Lists" to={"/contact-lists"} component={Link} />
            <NavLink label="All contacts" to={"/contacts"} component={Link} />
          </NavLink>
          <NavLink label="Templates" leftSection={<IconTemplate />}>
            <NavLink label="sms" to={"/sms/templates"} component={Link} />
            <NavLink label="Email contacts" to={"/contacts"} component={Link} />
          </NavLink>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
}
