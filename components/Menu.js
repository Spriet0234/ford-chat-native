import styles from '../styles/ChatStyle.js'
export default function Menu({handleClicks, menuVisible, setMenuVisible}){
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
<View
          style={{
            backgroundColor: "white",
            position: "absolute",
            right: 17,
            top: 110,
            zIndex: 100,
            width: "92%",
            height: "auto",
            opacity: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#113B7A1A",
              flex: 1,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>HenrAI Menu</Text>
              <TouchableOpacity
                onPress={() => {
                  if (!menuVisible) {
                    setMenuVisible(true);
                  } else {
                    setMenuVisible(false);
                  }
                }}
              >
                <Image source={require("../assets/x.png")}></Image>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (open1) {
                    setOpen1(false);
                  } else {
                    setOpen1(true);
                  }
                }}
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 0,
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Buying a Ford
                </Text>
              </TouchableOpacity>
              {open1 && (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      color: "#00095B",
                      borderRadius: 5,
                      padding: 10,
                      marginBottom: 0,
                      borderColor: "#00095B",
                      borderWidth: 1,
                      marginTop: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('I')}}
                    >
                      Info on a specific Ford
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('A')}}
                    >
                      Car recommendation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('D')}}
                    >
                      Car pricing estimator{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('B')}}
                    >
                      Find a dealership{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('C')}}
                    >
                      Schedule a test drive{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (open2) {
                    setOpen2(false);
                  } else {
                    setOpen2(true);
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Existing Owner
                </Text>
              </TouchableOpacity>
              {open2 && (
                <View>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Maintenance request{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Car resale{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (open3) {
                    setOpen3(false);
                  } else {
                    setOpen3(true);
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Info About Ford
                </Text>
              </TouchableOpacity>
              {open3 && (
                <View>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Innovation and sustainability{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (open4) {
                    setOpen4(false);
                  } else {
                    setOpen4(true);
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Know my car's price
                </Text>
              </TouchableOpacity>
              {open4 && (
                <View>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Electric vehicles{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Dealer vehicles{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>)
                    }