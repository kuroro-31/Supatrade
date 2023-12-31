import { render, screen } from "@testing-library/react";

import Header from "../../../../app/components/atoms/header";
import { useStore } from "../../../../store";

jest.mock("../../../../store");

describe("Header", () => {
  it("renders login and signup links when user is not logged in", () => {
    (useStore as unknown as jest.Mock).mockReturnValue({ user: null });

    render(<Header />);

    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.getByText("新規登録")).toBeInTheDocument();
  });

  it("renders profile link and new blog button when user is logged in", () => {
    (useStore as unknown as jest.Mock).mockReturnValue({ user: { id: "1" } });

    render(<Header />);

    expect(screen.getByText("プロフィール")).toBeInTheDocument();
    expect(screen.getByText("新規投稿")).toBeInTheDocument();
  });
});
