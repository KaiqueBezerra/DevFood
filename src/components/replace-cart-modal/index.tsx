import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ReplaceCartModal({ visible, onConfirm, onCancel }: Props) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 24,
          }}
        >
          <View style={{ alignItems: "center", gap: 8 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
            >
              Você só pode adicionar itens de uma loja por vez
            </Text>

            <Text style={{ fontSize: 14, color: "#666", textAlign: "center" }}>
              Deseja esvaziar a sacola e adicionar este item?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#EA1D2C",
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 24,
            }}
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Esvaziar sacola e adicionar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onCancel}
            activeOpacity={0.7}
            style={{ marginTop: 16 }}
          >
            <Text
              style={{
                color: "#EA1D2C",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
