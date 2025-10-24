import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//initial data
const initialState = {
  users: [
    {
      userId: 0,
      userName: "test1234",
      userPassword: "test1234",
      userEmail: "test@test.com",
      userPhoneNumber: "000999777",
      updatedAt: "01/01/2025",
      status: true,
    },
    {
      userId: 1,
      userName: "Ngô Yến Nhi",
      userPassword: "12345678",
      userEmail: "nhimini@gmail.com",
      userPhoneNumber: "0368456741",
      updatedAt: "08/07/2025",
      status: true,
    },
    {
      userId: 2,
      userName: "Đinh Lam Trọng",
      userPassword: "12345678",
      userEmail: "zkusi@gmail.com",
      userPhoneNumber: "0989554127",
      updatedAt: "11/02/2025",
      status: false,
    },
    {
      userId: 3,
      userName: "Hoàng Ngọc Bích Thy",
      userPassword: "12345678",
      userEmail: "thy.ngoc039@gmail.com",
      userPhoneNumber: "0902859857",
      updatedAt: "03/07/2025",
      status: false,
    },
    {
      userId: 4,
      userName: "Mai Văn Vũ",
      userPassword: "12345678",
      userEmail: "vvm_sg@gmail.com",
      userPhoneNumber: "036441122",
      updatedAt: "09/10/2025",
      status: true,
    },
    {
      userId: 5,
      userName: "Lê Quốc Huy",
      userPassword: "abcd1234",
      userEmail: "huy.le@gmail.com",
      userPhoneNumber: "0901122334",
      updatedAt: "05/03/2025",
      status: true,
    },
    {
      userId: 6,
      userName: "Nguyễn Thị Kim Anh",
      userPassword: "kimanh2025",
      userEmail: "kimanh@gmail.com",
      userPhoneNumber: "0912345678",
      updatedAt: "10/02/2025",
      status: false,
    },
    {
      userId: 7,
      userName: "Phan Hữu Đạt",
      userPassword: "phandat89",
      userEmail: "phandat89@gmail.com",
      userPhoneNumber: "0938123456",
      updatedAt: "06/01/2025",
      status: true,
    },
    {
      userId: 8,
      userName: "Trần Hoàng Minh",
      userPassword: "minhtran",
      userEmail: "hoangminh@gmail.com",
      userPhoneNumber: "0976123456",
      updatedAt: "14/05/2025",
      status: true,
    },
    {
      userId: 9,
      userName: "Phạm Thảo Nhi",
      userPassword: "nhi1234",
      userEmail: "thaonhi@gmail.com",
      userPhoneNumber: "0911222333",
      updatedAt: "22/04/2025",
      status: false,
    },
    {
      userId: 10,
      userName: "Nguyễn Văn Hào",
      userPassword: "nguyenhao",
      userEmail: "hao.nguyen@gmail.com",
      userPhoneNumber: "0903777888",
      updatedAt: "12/06/2025",
      status: true,
    },
    {
      userId: 11,
      userName: "Đỗ Mỹ Duyên",
      userPassword: "duyen123",
      userEmail: "myduyen@gmail.com",
      userPhoneNumber: "0915446677",
      updatedAt: "18/08/2025",
      status: false,
    },
    {
      userId: 12,
      userName: "Trương Văn Long",
      userPassword: "truonglong",
      userEmail: "truonglong@gmail.com",
      userPhoneNumber: "0989556677",
      updatedAt: "28/09/2025",
      status: true,
    },
    {
      userId: 13,
      userName: "Vũ Thị Lan",
      userPassword: "lanvu2025",
      userEmail: "vulan@gmail.com",
      userPhoneNumber: "0905123456",
      updatedAt: "30/07/2025",
      status: true,
    },
    {
      userId: 14,
      userName: "Huỳnh Đức Tài",
      userPassword: "tauserIdev",
      userEmail: "ductai@gmail.com",
      userPhoneNumber: "0933445566",
      updatedAt: "02/03/2025",
      status: false,
    },
    {
      userId: 15,
      userName: "Phạm Thanh Tùng",
      userPassword: "tungpham",
      userEmail: "thanh.tung@gmail.com",
      userPhoneNumber: "0977112233",
      updatedAt: "09/05/2025",
      status: true,
    },
    {
      userId: 16,
      userName: "Nguyễn Nhật Quang",
      userPassword: "nhatquang",
      userEmail: "nhatquang@gmail.com",
      userPhoneNumber: "0944332211",
      updatedAt: "04/01/2025",
      status: true,
    },
    {
      userId: 17,
      userName: "Trần Thị Hồng",
      userPassword: "hongtran",
      userEmail: "hongtran@gmail.com",
      userPhoneNumber: "0966554433",
      updatedAt: "12/02/2025",
      status: false,
    },
    {
      userId: 18,
      userName: "Nguyễn Thị Hạnh",
      userPassword: "hanh123",
      userEmail: "hanhnguyen@gmail.com",
      userPhoneNumber: "0902999888",
      updatedAt: "21/08/2025",
      status: true,
    },
    {
      userId: 19,
      userName: "Đặng Minh Phúc",
      userPassword: "phucdang",
      userEmail: "phuc.dang@gmail.com",
      userPhoneNumber: "0922445566",
      updatedAt: "10/09/2025",
      status: true,
    },
    {
      userId: 20,
      userName: "Lý Ngọc Tuyết",
      userPassword: "tuyetly",
      userEmail: "ngoctuyet@gmail.com",
      userPhoneNumber: "0912333444",
      updatedAt: "17/03/2025",
      status: false,
    },
    {
      userId: 21,
      userName: "Trần Quốc Vinh",
      userPassword: "vinhtran",
      userEmail: "vinhtran@gmail.com",
      userPhoneNumber: "0935667788",
      updatedAt: "08/06/2025",
      status: true,
    },
    {
      userId: 22,
      userName: "Bùi Anh Thư",
      userPassword: "thubui",
      userEmail: "anhthu@gmail.com",
      userPhoneNumber: "0955123456",
      updatedAt: "01/07/2025",
      status: false,
    },
    {
      userId: 23,
      userName: "Phan Minh Hoàng",
      userPassword: "minhhoang",
      userEmail: "minhhoang@gmail.com",
      userPhoneNumber: "0966887788",
      updatedAt: "29/05/2025",
      status: true,
    },
    {
      userId: 24,
      userName: "Nguyễn Văn Tuấn",
      userPassword: "tuannguyen",
      userEmail: "tuanvn@gmail.com",
      userPhoneNumber: "0944556677",
      updatedAt: "02/04/2025",
      status: false,
    },
    {
      userId: 25,
      userName: "Trần Ngọc Hòa",
      userPassword: "hoatrn",
      userEmail: "ngochoa@gmail.com",
      userPhoneNumber: "0977332211",
      updatedAt: "11/02/2025",
      status: true,
    },
    {
      userId: 26,
      userName: "Lâm Thị Thu Hà",
      userPassword: "hathulam",
      userEmail: "thuhalam@gmail.com",
      userPhoneNumber: "0915667788",
      updatedAt: "07/07/2025",
      status: true,
    },
    {
      userId: 27,
      userName: "Đỗ Tuấn Kiệt",
      userPassword: "tuanKiet",
      userEmail: "dotuankiet@gmail.com",
      userPhoneNumber: "0938445566",
      updatedAt: "22/10/2025",
      status: true,
    },
    {
      userId: 28,
      userName: "Phan Hồng Nhung",
      userPassword: "nhungphan",
      userEmail: "hongnhung@gmail.com",
      userPhoneNumber: "0916778899",
      updatedAt: "30/09/2025",
      status: false,
    },
    {
      userId: 29,
      userName: "Nguyễn Văn Lộc",
      userPassword: "locnguyen",
      userEmail: "vanloc@gmail.com",
      userPhoneNumber: "0977445566",
      updatedAt: "12/10/2025",
      status: true,
    },
  ],

  status: "idle",
  error: null,
};
//thunks
// export const addUser = createAsyncThunk(
//   'users/addUser',
//   async (something)
// )
//slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      newUser.userId = Date.now();
      newUser.updatedAt = new Date().toLocaleDateString();
      state.users.push(newUser);
    },
    getUsers: (state) => {},
    updateUser: (state, action) => {
      const updatedUser = { ...action.payload };
      const index = state.users.findIndex((user) => user.userId === updatedUser.userId);
      if (index != -1) {
        updatedUser.updatedAt = new Date().toLocaleDateString();
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const deletedUserId = action.payload;
      state.users = state.users.filter((user) => user.userId !== deletedUserId);
    },
  },
});

export const { addUser, getUsers, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
